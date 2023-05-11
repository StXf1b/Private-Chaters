import { getMessaging, getToken } from "firebase/messaging";
export const useMessaging = () => {
    const messaging = getMessaging();
    getToken(messaging, {vapidKey: "BGFID7upGok9vxpLbDmqulnrzsMd3A09ONeqLFR7aUKhG6H6Aeeyo4-kj4R_kuy1q94Ktqc7e8urjvaVZzdTFsY"});
}