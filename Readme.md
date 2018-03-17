# Gendiff
[![Maintainability](https://api.codeclimate.com/v1/badges/7b2a3fb5a3b6a281d61e/maintainability)](https://codeclimate.com/github/Fitz354/gendiff/maintainability) [![Build Status](https://travis-ci.org/Fitz354/gendiff.svg?branch=master)](https://travis-ci.org/Fitz354/gendiff)

Compares two configuration files and shows a difference

Supported config formats: `.json`, `.yml`, `.ini`
Output formats: `plain text`, `tree`, `json`

### Install

`npm install -g gendiff-lozovsky`

### Usage

`gendiff [options] <firstConfig> <secondConfig>`

### Options
```
-V, --version        output the version number
-f, --format [type]  output format
-h, --help           output usage information
```

You can use it in your code

```
import gendiff from 'gendiff-lozovsky';

const diff = gendiff('./firstConfig.yml', './firstConfig.yml', 'json');
```