import {DatePipe} from "@angular/common";
import {AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
// import {StorageService} from "../../services/storage-service.service";


export function enumToObjectArray(enum_obj: any): { name: string, key: string }[] {
  let array = [];
  for (const key in enum_obj) array.push({name: key?.replace(/_/g, ' '), key: enum_obj[key]});

  return array;
}

export function enumToArray(enum_obj: any): any[] {
  const array = [];
  for (const key in enum_obj) {
    array.push(enum_obj[key]);
  }
  return array;
}


export function stringListToEnum(stringList: any[]): { [key: string]: any } {
  const enumObject: { [key: string]: any } = {};
  stringList.forEach((stringValue) => {
    enumObject[stringValue] = stringValue;
  });
  return enumObject;
}

export function generateYearList(): string[] {
  const currentYear = new Date().getFullYear();
  const startYear = 1901;
  const years: string[] = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year.toString());
  }
  return years;
}


export function hasSameProps(obj1: any, obj2: any) {
  return Object.keys(obj1).every(function (prop) {
    return obj2.hasOwnProperty(prop);
  });
}

export function hasAllPropsIn(obj1: any, obj2: any) {
  let same: boolean = true;
  if (typeof obj2 !== "object" || !obj2 || !obj1) {
    return false;
  }
  Object.keys(obj1).forEach((key) => {
    if (!obj1[key]) {
      return false;
    }
    same = same && obj1[key] === obj2[key];
    return same
  });
  return same;
}

export function isObjectEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}


export function copyFields(obj2: any, fields: any[]) {
  let obj1: any = {};

  if (typeof obj2 !== "object" || !obj2) {
    return;
  }
  fields.forEach(key => {
    if (!obj2[key]) {
      return;
    }
    obj1[key] = obj2[key];
  });
  return obj1;
}

export function formatPhoneNumber(phone: any) {
  let str = phone?.toString();
  if (!(str?.length > 0) || !phone) {
    return phone;
  }
  if (str.indexOf("0") === 0 || str.indexOf("+") === 0) {
    phone = setCharAt(str, 0, "255");
  }
  return phone;
}


export function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) {
    return str;
  }
  return str.substring(0, index) + chr + str.substring(index + 1);
}

export function formatNumber(number: { toString: () => string; }, separator?: any) {
  return number.toString().replace(/\B(?=(\d3)+(?!\d))/g, separator ?? ",");
}


export function formatIfNumber(value: { toString: () => string; }, separator?: undefined) {
  // return number.toString().replace(/\B(?=(\d3)+(?!\d))/g, separator ?? ",");
  if (!value || (typeof value !== 'string' && typeof value !== 'number')) return value;
  return Number(value ?? 0) > 999 ? value?.toString()?.split('.')[0]?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, separator ?? '$1,') : value;
}


export function fieldsArrayFromObj(obj: { [x: string]: any; }) {
  let fields: { key: string, value: any, name: string }[] = [];

  if (typeof obj !== "object" || !obj) {
    return [];
  }
  Object.keys(obj).forEach(key => {
    fields.push({key: key, value: obj[key], name: key});
  });
  return fields;
}

export function truncateString(str: string, num: number) {
  if (!str) {
    return str;
  }

  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export function getFirstPresentKeyValue(object: { [x: string]: any; }, keys: any[]): any {
  let value = undefined;
  keys.forEach(key => {
    if (!!object[key]) {
      value = object[key];
    }
  });
  return value;
}


export function getFirstPresentKey(object: { [x: string]: any; }, keys: any[]): any {
  let key = undefined;
  keys.forEach(key_ => {
    if (!!object[key_]) {
      key = key_;
    }
  });
  return key;
}


export function valueIsEither(value: string, values: any): boolean {
  if (!Array.isArray(values)) values = [value];
  return !!values.find((v: { toString: () => string; }) => v?.toString() === value?.toString());
}

export function isValue(value: any) {
  return !!value || value === false || value === 0;
}


export function valueIncludesEither(value: string, values: string[]): boolean {
  let includes = false;
  if (typeof value !== "string") return false;
  values?.forEach(v => includes = includes ||
    (
      v?.includes(".") ? v?.toLowerCase()?.replace('.', '') === value?.toLowerCase() :
        value?.toLowerCase()?.includes(v?.toLowerCase())
    )
  );
  return includes;
}

export function getDateFromDays(date?: Date, days?: number): Date {
  var result = new Date(date ?? new Date());
  result.setDate(result.getDate() + (days ?? 0)); // Handle days being null
  return result;
}


export function hasProp(object: { [x: string]: any; }, keys: string | string[]) {
  if (typeof keys !== "string" && !Array.isArray(keys)) return false;
  let hasKey = false;
  typeof keys === "string" ? hasKey = !!object[keys] : [...keys].forEach(key => hasKey = hasKey || !!object[key]);
  return hasKey;
}

export function textBefore(str: string, char: string) {
  return str?.split(char)?.[0] ?? str;
}

export function textAfter(str: string, char: string) {
  return str?.split(char)?.[1] ?? str
}

export function getStringWrappedIn(str: string, char?: string): string {
  if (!char || !str?.includes(char)) return ''; // Check if char is undefined or not present in str
  let lastIndex = str.lastIndexOf(char);
  let specials = ['()', '{}', '[]', '<>', '--', '**', '!!', '__', '++'];
  if (char && valueIsEither(char, specials.map(e => e?.[0]))) {
    lastIndex = str.lastIndexOf(specials.find(e => valueIncludes(e, char[0]))?.[1] ?? ''); // Handle case where specials.find returns undefined
  }
  return str.substring(str.indexOf(char) + 1, lastIndex);
}



export function valueIncludes(value: string | undefined, values: string[] | string, ignoreDot = false): boolean {
  let includes = false;
  if (!value || typeof value !== "string") return false;
  if (Array.isArray(values)) values?.forEach(v => includes = includes ||
    (
      v?.toString()?.includes(".") && !ignoreDot ? v?.toString()?.toLowerCase()?.replace('.', '') === value?.toString()?.toLowerCase() :
        value?.toString()?.toLowerCase()?.includes(v?.toString()?.toLowerCase())
    )
  );

  else includes = values?.toString()?.includes(".") && !ignoreDot ? values?.toString()?.toLowerCase()?.replace('.', '') === value?.toLowerCase() :
    value?.toString()?.toLowerCase()?.includes(values?.toLowerCase());

  return includes;
}


export function toCamelCase(str: string) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function replaceWords(str: string, find: string | RegExp | any[], replace = "") {
  if (!str || typeof str !== 'string' || !find || !replace) return '';
  if (Array.isArray(find)) find.forEach(s => str = str.replace(new RegExp(s, 'g'), replace))
  else str = str?.replace(new RegExp(find, 'g'), replace)
  return str;
}


export function valueIncluded(value: string, values: string[] | string): boolean {
  let includes = false;
  if (Array.isArray(values)) values?.forEach(v => includes = includes ||
    (
      value?.includes(".") ? value?.toLowerCase()?.replace('.', '') === v?.toLowerCase() :
        v?.toLowerCase()?.includes(value?.toLowerCase())
    )
  );

  else includes = value?.includes(".") ? value?.toLowerCase()?.replace('.', '') === values?.toLowerCase() :
    values?.toLowerCase()?.includes(value?.toLowerCase());

  return includes;
}

export function valueIncludedInEither(value: string, values: string[]): boolean {
  let includes = false;
  values.forEach(v => includes = includes || v.toLowerCase().includes(value.toLowerCase()));
  return includes;
}

export function nameValueArr(y: any[]) {
  return y.map((x: any) => {
    return {name: x, value: x};
  });
}

export function camelToSpaced(y: string | undefined) {
  if (typeof y !== "string" || y.includes(" ")) {
    return y;
  }
  return y.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, "$1");
}

export function camelToTitleCase(string: string): string {
  if (typeof string !== "string") return string;
  return (string.charAt(0).toUpperCase() + string.slice(1))
    .replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, "$1")
}


export function trim(s: string) {
  if (typeof s !== "string") return s;
  return s.replace(/\s+/g, "");
}


export function replaceSpaces(s: string, x = "") {
  if (typeof s !== "string") return s;
  return s.replace(/\s+/g, x);
}


export function capitalizeFirstLetter(string: string | undefined) {
  if (!string) return '';
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export function toTitleCase(text: string) {
  if (!text) {
    return "";
  }
  var i, j, str, lowers, uppers;
  str = text.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  lowers = ["A", "An", "The", "And", "But", "Or", "For", "Nor", "As", "At",
    "By", "For", "From", "In", "Into", "Near", "Of", "On", "Onto", "To", "With"];
  for (i = 0, j = lowers.length; i < j; i++) {
    str = str.replace(new RegExp("\\s" + lowers[i] + "\\s", "g"),
      function (txt) {
        return txt.toLowerCase();
      });
  }

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ["Id", "Tv"];
  for (i = 0, j = uppers.length; i < j; i++) {
    str = str.replace(new RegExp("\\b" + uppers[i] + "\\b", "g"),
      uppers[i].toUpperCase());
  }

  return str;
}


export function getDaysBetween(StartDate: any, EndDate: any) {
  if (!StartDate?.split("-").length || !EndDate?.split("-").length) return 0;
  // The number of milliseconds in all UTC days (no DST)
  const oneDay = 1000 * 60 * 60 * 24;
  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(EndDate.split("-")[0], EndDate.split("-")[1], EndDate.split("-")[2]);
  const end = Date.UTC(StartDate.split("-")[0], StartDate.split("-")[1], StartDate.split("-")[2]);
  // so it's safe to divide by 24 hours
  return (start - end) / oneDay;
}

export function singularize(word: string) {
  const endings: {[key: string]: string} = {
    ves: "fe",
    ies: "y",
    i: "us",
    zes: "",
    ses: "",
    es: "",
    s: ""
  };
  return word.replace(
    new RegExp(`(${Object.keys(endings).join("|")})$`),
    r => endings[r]
  );
}

export function countOccurrences(str: string, find: string) {
  if (typeof str !== "string") {
    return 0;
  }
  return (str.split(find)).length - 1;
}

var num = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
var tens = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");

export function numberTowords(n: number): string {
  if (n < 20) {
    return num[n];
  }
  let digit = n % 10;
  if (n < 100) {
    return tens[~~(n / 10) - 2] + (digit ? "-" + num[digit] : "");
  }
  if (n < 1000) {
    return num[~~(n / 100)] + " hundred" + (n % 100 == 0 ? "" : " and " + numberTowords(n % 100));
  }
  return numberTowords(~~(n / 1000)) + " thousand" + (n % 1000 != 0 ? " " + numberTowords(n % 1000) : "");
}

export function coolness(x: any) {
  return x;
}

export function removeLeadingPhoneCode(phone: any) {
  let str = phone?.toString();
  if (!(str?.length > 0) || !phone) {
    return phone;
  }
  if (str.indexOf("0") === 0) {
    return setCharAt(str, 0, "");
  }
  if (str.indexOf("+255") === 0) {
    return str?.replace("+255", "");
  }
  if (str.indexOf("255") === 0) {
    return str?.replace('255', '');
  }
}

export function isAllNumbersWithLengthBetween(val: string, n: number, m: number) {
  let isnum = /^\d+$/.test(val);
  if (val.length >= n && val.length <= m && isnum) {
    return true;
  }
  return false;
}

export function getFormatedDate(string: string | number | Date, format = 'dd - MMM - y', type = 'en-GB') {
  new DatePipe(type).transform(string, format)
}

export function addMonthsToDate(date_: string | number | Date, numOfMonths: number) {
  if (!numOfMonths) return date_
  let date = new Date(date_);
  const dateCopy = new Date(date.getTime());
  dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
  return dateCopy;
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

export function isNotDefined(x: string | null | undefined) {
  return x === undefined || x === null || x === '';
}

export function isDefined(x: string | null | undefined) {
  return x !== undefined && x !== null && x !== '';
}

export function getClassListFromFieldString(s: string) {
  let classList = s;
  if (!s) return s;
  if (!s.includes('(')) return classList = "";
  else if (!s.includes(')')) return classList = "";
  else return classList = s.substring(s.indexOf('(') + 1, s.indexOf(')')).trim();
}

export function getIconClassListFromFieldString(s: string) {
  let classList = s;
  if (!s) return s;
  if (!s.includes('[')) return classList = "";
  else if (!s.includes(']')) return classList = "";
  else return classList = s.substring(s.indexOf('[') + 1, s.indexOf(']')).trim();
}

export function getIconFromFieldString(s: string) {
  let icon = s;
  if (!s) return s;
  if (!s.includes('icon-') || !s.includes('(') || !s.includes(')')) return icon = "";
  s = s.replace('(', ' ');
  s = s.replace(')', ' ');
  return icon = s.substring(s.indexOf('icon-') + 5, s.indexOf(' ', s.indexOf('icon-'))).trim();
}

export function getInnerVisibleFields(s: string) {
  let fieldStrings: string[] = [];
  if (!s) return s;
  if (!s.includes('{')) return [];
  else if (!s.includes('}')) return [];
  else s.substring(s.indexOf('{') + 1, s.indexOf('}')).trim().split(',').forEach(x => fieldStrings.push(x.trim()));
  return fieldStrings
}

export function checkIfHasTabularDisplay(s: string) {
  let icon = s;
  if (!s) return s;
  if (s.includes('tabular')) return true;
  else return false

}


export function getDefaultColSize(col_: string, allFieldsClassList: string) {
  let col = 'medium';
  if (valueIncludes(col_, ['large', 'medium', 'small', 'very-small'])) return col_;

  else if (!allFieldsClassList.includes('col-')) return col = "medium";
  else if (allFieldsClassList?.includes('-12')) return col = "large";
  else if (allFieldsClassList?.includes('-6')) return col = "medium";
  else if (allFieldsClassList?.includes('-4')) return col = "small";
  else if (allFieldsClassList?.includes('-3')) return col = "very-small";

  return col
}


export function getColFromFieldString(s: string) {
  let col = "";
  if (!s.includes('col-')) return "";

  if (s.includes('(')) {
    if (s.indexOf('col-') > s.indexOf('(')) col = s.trim().split('col-')[s.split('col-').length - 1];
    if (s.indexOf('col-') < s.indexOf('(')) col = s.trim().split('col-')[1].split('(')[0].trim();
  }

  if (!s.includes('(')) return col = s.trim().split('col-')[s.split('col-').length - 1];

  return col;
}


export function getNameFromFieldString(s: string) {
  if (!s) return s;
  s = s.split('{')[0];

  let as_i = s.indexOf(' as ');
  let class_i = s.indexOf('(');
  let col_i = s.indexOf('col-');

  if (as_i >= 0 && class_i >= 0 && col_i >= 0) return s.substring(as_i + 3, class_i > col_i ? col_i : class_i);
  if (as_i >= 0 && class_i >= 0 && !(col_i >= 0)) return s.substring(as_i + 3, class_i);
  if (as_i >= 0 && !(class_i >= 0) && col_i >= 0) return s.substring(as_i + 3, col_i);
  if (as_i >= 0 && !(class_i >= 0) && !(col_i >= 0)) return s.substring(as_i + 3, undefined);
  return s.split(" ")[0];
}


export function getKeyFromFieldString(s: string) {
  let key = s;
  if (!s) return s;
  return key = s.split(" ")[0];
}


export function valueIncludesBoth(value: string, values: string[]): boolean {
  let includes = true;
  if (Array.isArray(value)) value = value.toString();
  values?.forEach(v => includes = includes &&
    (
      v.includes(".") ? v.toLowerCase().replace('.', '') === value.toLowerCase() :
        value?.toLowerCase()?.includes(v?.toLowerCase())
    )
  );
  return includes;
}

export function spacelesslyIncludes(x: string, y: string) {
  if (typeof x !== "string") return false;
  else if (y.includes(".")) return trim(x?.toLowerCase()) === trim(y.replace(".", '')?.toLowerCase());
  else return !!trim(x?.toLowerCase())?.includes(trim(y?.toLowerCase()));
}

export const randomNumbers = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min)) + min;
}

export function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// export function getOptionsFromObservable(observable$:Observable<any>,name='name',value="uid"){
//   observable$.pipe(map(ms =>(ms.map(m=>({name:m[name],value:m[value]})))))
// }

export function domainValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // If the input is empty, don't perform validation
    }

    const emails: string[] = control.value.split(',').map((email: string) => email.trim()); // Split multiple emails by comma

    for (const email of emails) {
      const parts = email.split('@');
      if (parts.length !== 2 || !parts[1].includes('.')) {
        return { invalidDomain: true }; // Invalid domain format
      }
    }

    return null; // Validation passed
  };
}

//Password Validator Function
export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // If the input is empty, don't perform validation
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = passwordRegex.test(control.value);

    return isValid ? null : { strongPassword: true }; // Return error if password is not strong
  };
}


export function roundToNearest(n: number, x: number): number {
  return n ? Math.ceil(n / x) * x : 0;
}


export function setFormFieldsValidators(form: FormGroup, fields: string[], validators: any[]) {
  fields.forEach(field => {
    if (validators.length <= 0) form.get(field)?.clearValidators();
    else form.get(field)?.setValidators(validators);
    form.get(field)?.updateValueAndValidity();
  })
}

export function removeFormFieldsValidators(form: FormGroup, fields: string[]) {
  setFormFieldsValidators(form, fields, []);
}

export function clearAllValidators(controls: any | AbstractControl[]) {
  if (!Array.isArray(controls)) controls = <AbstractControl[]>[controls];

  controls.forEach((control: AbstractControl) => {
    control.clearValidators();
    control.updateValueAndValidity();
    if (control instanceof FormGroup) Object.values(control.controls).forEach((nested) => clearAllValidators(nested));
  })
}

// underconstruction
export function toggleAllValidators(controls: any | AbstractControl[]) {
  // let activeControls = new StorageService().get('activeControls') ?? [];

  if (!Array.isArray(controls)) controls = <AbstractControl[]>[controls];

  controls.forEach((control: AbstractControl) => {
    let currentParent
    control.clearValidators();
    control.updateValueAndValidity();
    // if (!control?.['_parent']) new StorageService().set('activeControls', {});
    if (control instanceof FormGroup) Object.values(control.controls).forEach((nested) => toggleAllValidators(nested));
  })
}

export function arrayToString(array: string[], n?: number): string {
  if (!Array.isArray(array)) return array;
  let str = array.map(s => " " + s).toString();
  str = str.substring(0, str.lastIndexOf(',')) + " and" + str.substring(str.lastIndexOf(',') + 1);
  return str;
}


/**
 * Returns the plural of an English word.
 *
 * @export
 * @param {string} word
 * @param {number} [amount]
 * @returns {string}
 */
export function toPlural(word: string, amount?: number): string {
  if (amount !== undefined && amount === 1) {
    return toSingular(word);
  }
  const plural: { [key: string]: string } = {
    '(quiz)$': "$1zes",
    '^(ox)$': "$1en",
    '([m|l])ouse$': "$1ice",
    '(matr|vert|ind)ix|ex$': "$1ices",
    '(x|ch|ss|sh)$': "$1es",
    '([^aeiouy]|qu)y$': "$1ies",
    '(hive)$': "$1s",
    '(?:([^f])fe|([lr])f)$': "$1$2ves",
    '(shea|lea|loa|thie)f$': "$1ves",
    'sis$': "ses",
    '([ti])um$': "$1a",
    '(tomat|potat|ech|her|vet)o$': "$1oes",
    '(bu)s$': "$1ses",
    '(alias)$': "$1es",
    '(octop)us$': "$1i",
    '(ax|test)is$': "$1es",
    '(us)$': "$1es",
    '([^s]+)$': "$1s"
  }
  const irregular: { [key: string]: string } = {
    'move': 'moves',
    'foot': 'feet',
    'goose': 'geese',
    'sex': 'sexes',
    'child': 'children',
    'man': 'men',
    'tooth': 'teeth',
    'person': 'people'
  }
  const uncountable: string[] = [
    'sheep',
    'fish',
    'deer',
    'moose',
    'series',
    'species',
    'money',
    'rice',
    'information',
    'equipment',
    'bison',
    'cod',
    'offspring',
    'pike',
    'salmon',
    'shrimp',
    'swine',
    'trout',
    'aircraft',
    'hovercraft',
    'spacecraft',
    'sugar',
    'tuna',
    'you',
    'wood'
  ]
  // save some time in the case that singular and plural are the same
  if (uncountable.indexOf(word.toLowerCase()) >= 0) {
    return word
  }
  // check for irregular forms
  for (const w in irregular) {
    const pattern = new RegExp(`${w}$`, 'i')
    const replace = irregular[w]
    if (pattern.test(word)) {
      return word.replace(pattern, replace)
    }
  }
  // check for matches using regular expressions
  for (const reg in plural) {
    const pattern = new RegExp(reg, 'i')
    if (pattern.test(word)) {
      return word.replace(pattern, plural[reg])
    }
  }
  return word
}

/**
 * Returns the singular of an English word.
 *
 * @export
 * @param {string} word
 * @param {number} [amount]
 * @returns {string}
 */
export function toSingular(word: string, amount?: number): string {
  if (amount !== undefined && amount > 1) {
    return toPlural(word);
  }
  const singular: { [key: string]: string } = {
    '(quiz)zes$': "$1",
    '(matr)ices$': "$1ix",
    '(vert|ind)ices$': "$1ex",
    '^(ox)en$': "$1",
    '(alias)es$': "$1",
    '(octop|vir)i$': "$1us",
    '(cris|ax|test)es$': "$1is",
    '(shoe)s$': "$1",
    '(o)es$': "$1",
    '(bus)es$': "$1",
    '([m|l])ice$': "$1ouse",
    '(x|ch|ss|sh)es$': "$1",
    '(m)ovies$': "$1ovie",
    '(s)eries$': "$1eries",
    '([^aeiouy]|qu)ies$': "$1y",
    '([lr])ves$': "$1f",
    '(tive)s$': "$1",
    '(hive)s$': "$1",
    '(li|wi|kni)ves$': "$1fe",
    '(shea|loa|lea|thie)ves$': "$1f",
    '(^analy)ses$': "$1sis",
    '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
    '([ti])a$': "$1um",
    '(n)ews$': "$1ews",
    '(h|bl)ouses$': "$1ouse",
    '(corpse)s$': "$1",
    '(us)es$': "$1",
    's$': ""
  }
  const irregular: { [key: string]: string } = {
    'move': 'moves',
    'foot': 'feet',
    'goose': 'geese',
    'sex': 'sexes',
    'child': 'children',
    'man': 'men',
    'tooth': 'teeth',
    'person': 'people'
  }
  const uncountable: string[] = [
    'sheep',
    'fish',
    'deer',
    'moose',
    'series',
    'species',
    'money',
    'rice',
    'information',
    'equipment',
    'bison',
    'cod',
    'offspring',
    'pike',
    'salmon',
    'shrimp',
    'swine',
    'trout',
    'aircraft',
    'hovercraft',
    'spacecraft',
    'sugar',
    'tuna',
    'you',
    'wood'
  ]
  // save some time in the case that singular and plural are the same
  if (uncountable.indexOf(word.toLowerCase()) >= 0) return word;

  // check for irregular forms
  for (const w in irregular) {
    const pattern = new RegExp(`${irregular[w]}$`, 'i')
    const replace = w
    if (pattern.test(word)) return word.replace(pattern, replace)
  }
  // check for matches using regular expressions
  for (const reg in singular) {
    const pattern = new RegExp(reg, 'i')
    if (pattern.test(word)) return word.replace(pattern, singular[reg])
  }
  return word
}


export function isValidDate(value: string) {
  var dateFormat;
  if (toString.call(value) === '[object Date]') return true;
  if (typeof value.replace === 'function') value.replace(/^\s+|\s+$/gm, '');
  dateFormat = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;
  return dateFormat.test(value);
}


export function deleteFields(object: any | {}, keys: string[] | any) {
  if (!keys || !object) return object;
  if (!Array.isArray(keys)) keys = [keys];
  keys?.forEach((key_: string) => {
    let key = key_.split('.')[0];
    if (!object.hasOwnProperty(key)) return;
    if (key_.includes('.')) object[key] = deleteFields(object[key], key_.substring(key_.indexOf('.') + 1));
    else delete object[key];
  });
  return object;
}


export function deleteFieldsIfNull(object: any | {}, keys: string[] | any) {
  if (!keys || !object) return object;
  if (!Array.isArray(keys)) keys = [keys];
  keys?.forEach((key_: string) => {
    let key = key_.split('.')[0];
    if (!object.hasOwnProperty(key)) return;
    if (key_.includes('.')) object[key] = deleteFields(object[key], key_.substring(key_.indexOf('.') + 1));
    else !object?.[key] && delete object[key];
  });
  return object;
}

