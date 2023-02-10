# react-forms-from-zod
Created with CodeSandbox


```ts

import z from "zod";
import { toGermanDateTimeString } from "../date-fns";

//ZodErrorMap

//mixed
const mixedError: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      return {
        message: "Der Wert des Feldes ist ungültig", //invalid type
      };
    case z.ZodIssueCode.invalid_type:
      if (error.received === null)
        return {
          message: 'Dieses Feld darf keinen "null" Wert enthalten', //null ---------------- offen
        };
      break;
    case z.ZodIssueCode.unrecognized_keys:
      return {
        message: `Die Eingabe enthält nicht zulässige Zeichen: ${error.keys}`, //unrecognzied keys
      };
    case z.ZodIssueCode.invalid_enum_value:
      return {
        message: `Der Wert des Feldes muss einem der folgenden Werte entsprechen: ${error.options}`, //matches
      };
    default:
      return { message: ctx.defaultError };
  }
};

//string
const stringError: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.unrecognized_keys:
      return {
        message: `Die Eingabe enthält nicht zulässige Zeichen: ${error.keys}`, //unrecognzied keys ----------- probieren
      };
    case z.ZodIssueCode.too_small:
      return {
        message: `Die Zeichenkette muss mindestens ${error.minimum} Zeichen lang sein`, //min
      };
    case z.ZodIssueCode.too_big:
      return {
        message: `Die Zeichenkette darf höchstens ${error.maximum} Zeichen lang sein`, //max
      };
    case z.ZodIssueCode.invalid_enum_value:
      return {
        message: `Der Wert des Feldes muss einem der folgenden Werte entsprechen: ${error.options}`, //matches
      };
    case z.ZodIssueCode.invalid_string:
      if (error.validation === "email") {
        return {
          message: "Die Eingabe entspricht keiner validen E-Mail Adresse", //email
        };
      }
    case z.ZodIssueCode.invalid_string:
      if (error.validation === "url") {
        return {
          message: "Die Eingabe entspricht keiner validen URL", //url
        };
      }
    case z.ZodIssueCode.invalid_string:
      if (error.validation === "uuid") {
        return {
          message: "Die Eingabe entspricht keiner validen UUID", //uuid
        };
      }
    default:
      return { message: ctx.defaultError };
  }
};

//number
const numberError: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.too_small:
      return {
        message: `Die Eingabe muss größer gleich als ${error.minimum} sein`, //min
      };
    case z.ZodIssueCode.too_big:
      return {
        message: `Die Eingabe muss kleiner gleich als ${error.maximum} sein`, //max
      };
    case z.ZodIssueCode.invalid_type:
      if (error.expected === "integer") {
        return {
          message: "Die Eingabe muss einer ganzen Zahl entsprechen", //integer
        };
      }
    default:
      return { message: ctx.defaultError };
  }
};

//date
const dateError: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.invalid_date:
      return {
        message: `Das eingebene Datum ist nicht gültig`, //min
      };
    case z.ZodIssueCode.too_small:
      return {
        message: `Die Eingabe muss jünger als ${toGermanDateTimeString(
          error.minimum
        )}  `, //min
      };
    case z.ZodIssueCode.too_big:
      return {
        message: `Die Eingabe muss jünger als ${toGermanDateTimeString(
          error.maximum
        )}  `, //min
      };
    default:
      return { message: ctx.defaultError };
  }
};

//boolean
const booleanError: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.expected === "boolean") {
        return {
          message: `Die Eingabe muss "Wahr" : "Falsch" sein`, //boolean
        };
      }
    default:
      return { message: ctx.defaultError };
  }
};

const arrayError: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.too_small:
      if (error.minimum === 1) {
        return { message: "Es muss mindestens eine Eingabe erfolgen" }; //min 1
      } else {
        return {
          message: `Es müssen mindeststens ${error.minimum} Eingaben erfolgen`, //min
        };
      }
    case z.ZodIssueCode.too_big:
      if (error.maximum === 1) {
        return { message: "Es darf nur eine Eingabe erfolgen" }; //max 1
      } else {
        return {
          message: `Es dürfen höchstens ${error.maximum} Eingaben erfolgen`, //max
        };
      } //Length fehlt noch
    default:
      return { message: ctx.defaultError };
  }
};

```