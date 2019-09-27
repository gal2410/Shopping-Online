
export class Employee {

    constructor(_id = '', title = '', item = '', description = '', price = 0, image = '', Category_name = '') {
        this._id = _id;
        this.title = title;
        this.item = item;
        this.description = description;
        this.price = price;
        this.image = image;
        this.Category_name = Category_name;

    }



    _id: string;
    title: string;
    item: string;
    description: string;
    price: number;
    image: string;
    Category_name: string;

}