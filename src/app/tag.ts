export class Matchable {
    id: number;
    name: string;
    slug: string;
}

export class Tag extends Matchable {
    color: number;
    matching_algorithm;
}


export class Correspondent extends Matchable {
}