import { Notyf } from "notyf";

class NotificationService{
    private notification = new Notyf({position: {x:"center", y:"top"}, duration:2000, ripple: true});

    public success(message: string): void{
        this.notification.success(message);
    }
}

const notificationService = new NotificationService();

export default notificationService;