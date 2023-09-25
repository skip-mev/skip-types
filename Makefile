BLOCK_SDK_PROTO = protos/block-sdk/proto
POB_SDK_PROTO = protos/pob/proto

proto-typescript: 
	cd $(BLOCK_SDK_PROTO) && buf generate --template ../../../typescript/buf.gen.ts.yaml
	cd $(POB_SDK_PROTO) && buf generate --template ../../../typescript/buf.gen.ts.yaml

proto-python:
	cd $(BLOCK_SDK_PROTO) && buf generate --template ../../../python/buf.gen.python.yaml
	cd $(POB_SDK_PROTO) && buf generate --template ../../../python/buf.gen.python.yaml

generate_init_py_files:
	find python/src -type d -exec touch {}/__init__.py \;