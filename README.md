
<br />

![npm](https://img.shields.io/npm/v/i18n-json-to-xlsx-converter?color=brightgreen)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![Open Source Love svg2](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)


# i18n-json-to-xlsx-converter CLI

<img src="https://repository-images.githubusercontent.com/386980704/45fee350-b9fb-4f33-ab05-8519f23c9af5" title="i18n JSON to XLSX Converter Logo" width="50%" />

## About

_i18n JSON to XLSX Converter_ is a CLI tool runs in a terminal, and helps you to convert a **JSON** file to an **EXCEL** file with dot notation keys column and a column of the values of these keys. Or convert an **EXCEL** file which has one or more translation columns in it to **JSON** file(s), in no time.

## Installation

Install _i18n JSON to XLSX Converter_ with `npm`

```bash
  npm install i18n-json-to-xlsx-converter
```

## Usage/Examples

If you have installed _i18n JSON to XLSX Converter_ you can use it with the command

```bash
   i18n-json-to-xlsx-converter --convert 'file path of the JSON or XLSX file'
```

If you haven't installed _i18n JSON to XLSX Converter_ you can use it with the command

```bash
   npx i18n-json-to-xlsx-converter --convert 'file path of the JSON or XLSX file'
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Details

_i18n JSON to XLSX Converter_ created for helping developers for generating an EXCEL file from their JSON file which is used for i18n translations. Also, developers can create one, or many JSON files from an EXCEL file for their project, as well.
  

#### Features

- It can convert nested i18n JSON file to an EXCEL file
- It can convert an EXCEL file to a JSON file, or files easily
- It runs in a terminal as a CLI
- User friendly
- Well tested

#### Reason behind converting a JSON file to an XLSX file

Multilingual applications need translation files in the projects. Hence, developers needs language files in JSON file format(s), and these JSON files need to have translation values for each key. Usually different teams are handling the translation values, and they can't work on the JSON files since they are not specialized on the development field. 

> Assume that we have a **JSON** file names as `en.json`, and it has a content as
> 
> ```json
>     {
>       "nestedObject": {
>         "nameOfTheArea": {
>           "title": "Title",
>           "subTitle": "Subtitle",
>           "context": "Context"
>         }
>       }
>     }
> ```

Since most of them can work on the **EXCEL** easily, this tool helps developers to provide an **EXCEL** file for them to fill in the translations. They can fill the **EXCEL** file with one, or many translation columns they want to provide, and send it back to the developers. 

> If they fill out the values in the **EXCEL** file for only one language column for example `EN`, the file needs to be in the format of
> 
> | Key | EN     |
> | :-------- | :------- |
> | `nestedObject.nameOfTheArea.title` | `Title` |
> | `nestedObject.nameOfTheArea.title` | `Subtitle` |
> | `nestedObject.nameOfTheArea.title` | `Context` |
> 

If the provided **EXCEL** file has only one translation value column, the output **JSON** file will be only one, and it will have the column title as file name. In this case it'll be `en.json`.

>
> If they fill out the values in the **EXCEL** file for multiple language column for example `EN`, `NL`, `DE`, the file needs to be in the format of
 > 
 > | Key | EN     | NL     | DE     |
 > | :-------- | :------- | :------- | :------- |
 > | `nestedObject.nameOfTheArea.title` | `Title` | `Titel` | `Titel` |
 > | `nestedObject.nameOfTheArea.title` | `Subtitle` | `Ondertitel` | `Untertitel` |
 > | `nestedObject.nameOfTheArea.title` | `Context` | `Context` | `Kontext` |
 > 


If the provided **EXCEL** file has multiple translation value columns, the output **JSON** files will be multiple, and they will have the column titles as file names. In this case they'll be `en.json`, `nl.json`, `de.json`

_i18n JSON to XLSX Converter_ is a tool for developers to create **JSON** file(s) with no effort in the end.


## Demo

<img src="https://raw.githubusercontent.com/ofcyln/i18n-json-to-xlsx-converter/main/static/i18n-json-to-xlsx-converter-midsize.gif" title="i18n JSON to XLSX Converter Demo" width="100%" />

  
## Author

[@ofcyln](https://www.github.com/ofcyln)

For support, email `ofcyln@gmail.com`
  
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ofcyln/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/ofcyln)
  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  
