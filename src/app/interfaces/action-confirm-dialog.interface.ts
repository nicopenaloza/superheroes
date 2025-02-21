import { Observable } from "rxjs";

export interface IActionConfirmDialogData {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm?: () => Observable<any>;
}