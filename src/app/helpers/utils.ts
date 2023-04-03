import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export const URL_PATTERN = /^(https?:\/\/)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]+)?$/;

export const ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9@#$_+-,.áéíóúÁÉÍÓÚñÑ]+([ ][a-zA-Z0-9@#$_+-,.áéíóúÁÉÍÓÚñÑ]+)*$/;

export const TITLE_PATTERN = /^[a-zA-Z\s\-#.áéíóúÁÉÍÓÚñÑ\.]+$/;

export const LETTER_PATTERN = /^[a-zA-Z.]+(\s[a-zA-Z.]+)*$/;

export const NUMBER_PATTERN = /^[0-9]*$/;

export const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const MODAL_OPTIONS: NgbModalOptions = {
  backdrop: 'static',
  keyboard: false,
  centered: true,
}