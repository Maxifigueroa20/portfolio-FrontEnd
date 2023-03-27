import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export const URL_PATTERN = /^(https?:\/\/)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]+)?$/;

export const ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9@#$_+-]+([ ][a-zA-Z0-9@#$_+-]+)*$/;

export const NUMBER_PATTERN = /^[0-9]*$/;

export const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const MODAL_OPTIONS: NgbModalOptions = {
  backdrop: 'static',
  keyboard: false,
  centered: true,
}