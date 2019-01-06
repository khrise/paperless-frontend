export const eqFilter = (field: string, value?: string): FilterValue => {
    return { type: "string", operator: "eq", field: field, key: field + "__eq", value: value || null }
}

export const idFilter = (field: string, value?: string): FilterValue => {
    return { type: "id", operator: "", field: field, key: field, value: value || null }
}


export const containsFilter = (field: string, value?: string): FilterValue => {
    return { type: "string", operator: "contains", field: field, key: field + "__icontains", value: value || null }
}

export const ltFilter = (field: string, value?: string): FilterValue => {
    return { type: "date", operator: "lt", field: field, key: field + "__lt", value: value || null }
}

export const gtFilter = (field: string, value?: string): FilterValue => {
    return { type: "date", operator: "gt", field: field, key: field + "__gt", value: value || null }
}

export const lteFilter = (field: string, value?: string): FilterValue => {
    return { type: "date", operator: "lte", field: field, key: field + "__lte", value: value || null }
}

export const gteFilter = (field: string, value?: string): FilterValue => {
    return { type: "date", operator: "gte", field: field, key: field + "__gte", value: value || null }
}

export interface FilterValue {
    type: string;
    operator: string;
    field: string
    key: string;
    value: string | string[];
}

export class Filter {
    _defaultFilters;
    _customFields: string[] = [];
    constructor(public fieldFilters: FilterValue[] = []) {
        this._defaultFilters = fieldFilters.slice();
    }
    public get stringFilters() {
        return this.fieldFilters.slice().filter(elem => elem.type === "string");
    }
    public reset() {
        this.fieldFilters = this._defaultFilters.slice();
        for (let f of this._customFields) {
            delete this[f];
        }
        this._customFields.length = 0;
    }
    public addCustomField(name: string, value?: any) {
        if (this._customFields.findIndex(elem => elem === name) < 0) {
            this._customFields.push(name)
        }
        this[name] = value;
    }

    public removeCustomField(name: string) {
        let index = this._customFields.findIndex(elem => elem === name);
        if (index > -1) {
            this._customFields = this._customFields.splice(index, 1);
        }
        delete this[name];
    }
}

export class LogFilter extends Filter {
}

export class MatchableFilter extends Filter {
    constructor(name?: string) {
        super([
            containsFilter('name'),
            containsFilter('slug')
        ]);
    }
}

export class DocumentFilter extends Filter {
    tagIds: number[] = [];
    noTags: boolean = false;

    constructor() {
        super([
            containsFilter('title'),
            containsFilter('content'),
            containsFilter('tags__name'),
            containsFilter('correspondent__name'),
        ]);
    }

}
