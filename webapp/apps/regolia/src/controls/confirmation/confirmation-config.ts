import {msButtonTheme} from "@ms-fluent/components";

export const IMAGE_ICON_BIN_URL = '/assets/icon/bin.png';
export const IMAGE_ICON_CANCEL_URL = '/assets/icon/cancel.png';
export const IMAGE_ICON_REMOVE_USER_URL = '/assets/icon/remove-user.png';
export const CONFIRM_DELETE_BUTTON: ConfirmationConfigButton = {text: 'Supprimer', theme: 'error'}
export const CONFIRM_CANCEL_BUTTON: ConfirmationConfigButton = {text: 'Annuler', theme: 'standard'}

export class ConfirmationConfigButton {
  text: string;
  theme: msButtonTheme
}

export class ConfirmationConfig {
  text: string;
  imageIconUrl: string;

  confirmButton?: ConfirmationConfigButton = {text: 'Oui', theme: 'primary'}
  cancelButton?: ConfirmationConfigButton = {text: 'Annuler', theme: 'standard'}
}
