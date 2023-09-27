import os
from setuptools import setup, find_packages

# Utility function to read the README file.
# Used for the long_description.  It's nice, because now 1) we have a top level
# README file and 2) it's easier to type in the README file than to put a raw
# string in below ...
def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "skip-types",
    version = "0.1.0",
    author = "Jan Fabián",
    author_email = "jan@skip.money",
    description = ("A helper library to interact with block-sdk."),
    license = "MIT",
    url = "http://packages.python.org/an_example_pypi_project",
    package_dir={'':"src"},
    packages=find_packages("src"),
    install_requires=["setuptools>=61.0", "cosmpy==0.6.0"],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)