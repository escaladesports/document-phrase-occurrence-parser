# Document Phrase Occurrence Parser

Finds the number of occurrences of one or more phrases in a directory of .doc, .docx, and .pdf files.

## Installation

```bash
npm install --global document-phrase-occurrence-parser
```

## Usage

```bash
dpop --phrases "laser, shirt, the"
```

## Extraction Requirements

[Textract](https://github.com/dbashford/textract) is used to extract files. Depending on the files you want to extract and your OS, there may be external dependencies.

* `PDF` extraction requires `pdftotext` be installed, [link](http://www.foolabs.com/xpdf/download.html)
* `DOC` extraction requires `antiword` be installed, [link](http://www.winfield.demon.nl/), unless on OSX in which case textutil (installed by default) is used.