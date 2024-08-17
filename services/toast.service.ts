
export class ToastService {


    constructor(private toast: any) {
    }

    info(message: string) {
        this.toast.add({
            color: "blue",
            title: "Info",
            description: message,
            timeout: 5000,
            icon: "i-heroicons-information-circle"
        });
    }

    success(message: string) {
        this.toast.add({
            color: "emerald",
            title: "Success",
            description: message,
            timeout: 5000,
            icon: "i-heroicons-check-circle"
        });
    }

    failure(message: string) {
        this.toast.add({
            color: "red",
            title: "Failure",
            description: message,
            timeout: 5000,
            icon: "i-heroicons-cross-circle"
        });
    }
}