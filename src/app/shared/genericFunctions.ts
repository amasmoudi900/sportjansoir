export function generateId(Tab: any) {
    if (Tab.length == 0) {
        return 1;
    }
    let max = Tab[0].id;
    for (let i = 1; i < Tab.length; i++) {
        if (Tab[i].id > max) {
            max = Tab[i].id;
        }
    }
    return max + 1;
}

export function getFromLS(key: string) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}


export function editObject(key: string, tab: any, obj: any) {
    let position = tab.findIndex((elt: any) => elt.id == obj.id);
    tab[position] = obj;
    localStorage.setItem(key, JSON.stringify(tab));
}


export function deleteObject(tab: any, id: number, key: string) {
    let position = tab.findIndex((elt: any) => elt.id == id);
    tab.splice(position, 1);
    localStorage.setItem(key, JSON.stringify(tab));
}