
declare interface APIResponse<T> {
    message: string,
    description: string,
    body: T,
    time: number
}

declare interface Course {
    course_id: number,
    title: string,
    code: string,
    description: string,
    created_on: number
}

declare interface Instance {
    id: number,
    year: string,
    semester: string,
    course_id: number,
    created_on: number
}

declare interface ColumnMeta {
    key: string,
    label: string
}

declare interface RowActionMeta {
    label: string,
    icon: string,
    click: Function
}