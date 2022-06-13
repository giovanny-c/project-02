export function getExecutionTime(inSeconds: boolean = false) {

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value //metodo que vai ser aplicado o decorator

        descriptor.value = function (...args: any[]) {
            let divisor = 1
            let unity = "milisegundos"

            if (inSeconds) {
                divisor = 1000
                unity = "segundos"
            }

            const t1 = performance.now()

            const functionReturn = originalMethod.apply(this, args)

            const t2 = performance.now()

            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${unity}`)

            functionReturn
        }

        return descriptor.value
    }


}