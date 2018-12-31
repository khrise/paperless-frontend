const containsFilter = (field: string, value?: string): FilterValue => {
    return {operator: "contains", field: field, key: field + "__icontains", value: value || null}
}

export interface FilterValue {
    operator: string;
    field: string
    key: string;
    value: string;
}

export class Filter {
    public fieldFilters: FilterValue[] = [];
}

export class MatchableFilter extends Filter {
    fieldFilters = [
        containsFilter('name'),
        containsFilter('slug')
    ];

    constructor(name?: string) {
        super();
    }
}

export class DocumentFilter extends Filter {
    tagIds: number[] = [];
    noTags: boolean = false;
    fieldFilters = [
        containsFilter('title'),
        containsFilter('content'),
        containsFilter('tags__name'),
        containsFilter('correspondent__name'),
    ];

}
