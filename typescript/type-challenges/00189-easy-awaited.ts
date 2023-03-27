type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string

type MyAwaited<T>=T extends Promise<infer R>?R:never

export{}