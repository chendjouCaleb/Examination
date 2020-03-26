import { List } from '@positon/collections';

export class Paging<T> {

    items: List<T>;
    currentPage = 1;
    pageSize = 10;
    totalPages: number;
    countItems: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    nextPageLink: string;
    previousPageLink: string;
    orderBy="";
    descending: boolean;
    filter = "";

    get nextPages(): number[] {
        const pages = [];
        for(let i = this.currentPage + 1; i <= this.totalPages; i++){
            pages.push(i);
        }
        return pages;
    }

    get prevPages(): number[] {
        const pages = [];
        for(let i = 1; i < this.currentPage; i++){
            pages.push(i);
        }
        return pages;
    }

    static fromAny<U>(item: any): Paging<U> {
        if(!item){
            return null;
        }

        const paging = new Paging<U>();
        paging.items = new List<U>();
        item.items.forEach(i => {
            paging.items.add(i);
        });

        paging.currentPage = item.currentPage;
        paging.pageSize = item.pageSize;
        paging.totalPages = item.totalPages;
        paging.countItems = item.countItems;
        paging.hasNextPage = item.hasNextPage;
        paging.hasPreviousPage = item.hasPreviousPage;
        paging.nextPageLink = item.nextPageLink;
        paging.previousPageLink = item.previousPageLink;
        paging.orderBy = item.orderBy;
        paging.descending = item.descending;

        if(item.orderBy){
            paging.orderBy = item.orderBy;
        }

        if(item.filter){
            paging.filter = item.filter;
        }


        return paging;
    }

    getParams(){
        const params = {};
        if(this.currentPage){
            params["currentPage"] = this.currentPage;
        }
        if(this.pageSize){
            params["pageSize"] = this.pageSize;
        }
        if(this.orderBy){
            params["orderBy"] = this.orderBy;
        }
        if(this.descending){
            params["descending"] = this.descending;
        }
        if(this.filter){
            params["filter"] = this.filter;
        }

        return params;
    }
}
