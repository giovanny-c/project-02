export function getExecutionTime() {

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value //metodo que vai ser aplicado o decorator

        descriptor.value = function (...args: any[]) {
            const t1 = performance.now()

            const functionReturn = originalMethod.apply(this, args)

            const t2 = performance.now()

            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / 1000} segundos`)

            functionReturn
        }

        return descriptor
    }


}