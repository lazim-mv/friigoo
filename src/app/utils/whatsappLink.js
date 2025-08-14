export const getWhatsAppLink = (phoneNumber = "919947430188", message = "Hey Lazim! I found your website and would love to connect.") => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
