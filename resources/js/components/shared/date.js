export const todaysDate = () => {
    const date = new Date();

    const d = date.toJSON().slice(0, 10);
    const t = date.toJSON().slice(11, 20);

    const fDate = d + " " + t;
    return fDate;
};

export const tomorrowsDate = () => {
    const today = new Date()
const date = new Date(today)
date.setDate(date.getDate() + 1)

    const d = date.toJSON().slice(0, 10);
    const t = date.toJSON().slice(11, 20);

    const fDate = d + " " + t;
    return fDate;
};
