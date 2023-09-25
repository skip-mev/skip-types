from typing import List, Optional, Union

from cosmpy.aerial.tx import Transaction, SigningCfg, TxState, SigningMode, _create_proto_public_key, _wrap_in_proto_any, _is_iterable

from cosmpy.aerial.coins import parse_coins
from cosmpy.protos.cosmos.tx.signing.v1beta1.signing_pb2 import SignMode
from cosmpy.protos.cosmos.tx.v1beta1.tx_pb2 import (
    AuthInfo,
    Fee,
    ModeInfo,
    SignerInfo,
    Tx,
    TxBody,
)


class TransactionWithTimeout(Transaction):
    def seal(
        self,
        signing_cfgs: Union[SigningCfg, List[SigningCfg]],
        fee: str,
        gas_limit: int,
        timeout_height: int,
        memo: Optional[str] = None,
    ) -> "Transaction":
        """Seal the transaction.

        :param signing_cfgs: signing configs
        :param fee: transaction fee
        :param gas_limit: transaction gas limit
        :param memo: transaction memo, defaults to None
        :return: sealed transaction.
        """
        self._state = TxState.Sealed

        input_signing_cfgs: List[SigningCfg] = (
            signing_cfgs if _is_iterable(signing_cfgs) else [signing_cfgs]  # type: ignore
        )

        signer_infos = []
        for signing_cfg in input_signing_cfgs:
            assert signing_cfg.mode == SigningMode.Direct

            signer_infos.append(
                SignerInfo(
                    public_key=_create_proto_public_key(signing_cfg.public_key),
                    mode_info=ModeInfo(
                        single=ModeInfo.Single(mode=SignMode.SIGN_MODE_DIRECT)
                    ),
                    sequence=signing_cfg.sequence_num,
                )
            )

        auth_info = AuthInfo(
            signer_infos=signer_infos,
            fee=Fee(amount=parse_coins(fee), gas_limit=gas_limit),
        )

        self._fee = fee

        self._tx_body = TxBody()
        self._tx_body.timeout_height = timeout_height
        self._tx_body.memo = memo or ""
        self._tx_body.messages.extend(
            _wrap_in_proto_any(self._msgs)
        )  # pylint: disable=E1101

        self._tx = Tx(body=self._tx_body, auth_info=auth_info)
        return self
