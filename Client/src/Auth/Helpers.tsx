export let Colorings = new Array(5);

Colorings = [
    { color: "blue; ", filter: "filter: invert(47%) sepia(100%) saturate(30000%) hue-rotate(250deg) brightness(95%) contrast(80%); " },
    { color: "green; ", filter: "filter: invert(47%) sepia(100%) saturate(30000%) hue-rotate(135deg) brightness(95%) contrast(80%); " },
    { color: "red; ", filter: "filter: invert(47%) sepia(100%) saturate(30000%) hue-rotate(360deg) brightness(100%) contrast(80%); " },
    { color: "sandybrown; ", filter: "filter:  invert(47%) sepia(206%) saturate(100%) hue-rotate(340deg) brightness(96%) contrast(512%); " },
    { color: "mediumorchid; ", filter: "filter: invert(47%) sepia(84%) saturate(473%) hue-rotate(569deg) brightness(96%) contrast(512%); " },
]

export const ShufflePhotos = (photoCodes: any[]) => {
    var currentIndex = photoCodes.length, temporaryValue, temporaryIndex, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryIndex = photoCodes[currentIndex].index;
        temporaryValue = photoCodes[currentIndex];
        photoCodes[currentIndex].index = photoCodes[randomIndex].index;
        photoCodes[currentIndex] = photoCodes[randomIndex];
        photoCodes[randomIndex].index = temporaryIndex;
        photoCodes[randomIndex] = temporaryValue;
    }

    return photoCodes;
}

export const GetPhotoCodes = (path: string) => {
    return [
        { key: "ca", index: "01", value: path + '/01.png' },
        { key: "li", index: "02", value: path + '/02.png' },
        { key: "sh", index: "03", value: path + '/03.png' },
        { key: "dr", index: "04", value: path + '/04.png' },
        { key: "sc", index: "05", value: path + '/05.png' },
        { key: "at", index: "06", value: path + '/06.png' },
        { key: "du", index: "07", value: path + '/07.png' },
        { key: "gr", index: "08", value: path + '/08.png' },
        { key: "he", index: "09", value: path + '/09.png' },
        { key: "ke", index: "10", value: path + '/10.png' },
        { key: "mo", index: "11", value: path + '/11.png' },
        { key: "ka", index: "12", value: path + '/12.png' },
        { key: "ba", index: "13", value: path + '/13.png' },
        { key: "tr", index: "14", value: path + '/14.png' },
        { key: "tp", index: "15", value: path + '/15.png' },
        { key: "cl", index: "16", value: path + '/16.png' },
        { key: "wa", index: "17", value: path + '/17.png' },
        { key: "ro", index: "18", value: path + '/18.png' },
        { key: "pa", index: "19", value: path + '/19.png' },
        { key: "sp", index: "20", value: path + '/20.png' },
        { key: "st", index: "21", value: path + '/21.png' },
        { key: "ma", index: "22", value: path + '/22.png' },
        { key: "co", index: "23", value: path + '/23.png' },
        { key: "ch", index: "24", value: path + '/24.png' },
        { key: "fl", index: "25", value: path + '/25.png' },
        { key: "gl", index: "26", value: path + '/26.png' },
        { key: "bl", index: "27", value: path + '/27.png' },
        { key: "fi", index: "28", value: path + '/28.png' },
    ];
}