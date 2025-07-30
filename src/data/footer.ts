import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
} = {
    subheading: "We are a family, not just a gathering.",
    quickLinks: [
        {
            text: "YouTube",
            url: "https://www.youtube.com/@disciplemakerschurch_mk"
        },
        {
            text: "Instagram",
            url: "https://www.instagram.com/disciplemakerschurch.mk/"
        },
        {
            text: "TikTok",
            url: "https://www.tiktok.com/@disciplemakerschurchmk"
        }
    ],
    email: 'contact.disciplemakerschurch.uk',
    telephone: '+44 7359 293685',
}
