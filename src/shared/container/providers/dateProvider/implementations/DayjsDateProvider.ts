//import { AppError } from "../../../../errors/AppError"
import { IDateProvider } from "../IDateProvider"
const customParseFormat = require('dayjs/plugin/customParseFormat')

const dayjs = require("dayjs")
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
const isToday = require('dayjs/plugin/isToday')

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat) //para formatar de string pra date
dayjs.extend(isToday)

dayjs.tz.setDefault("America/Sao_Paulo")//timezone


class DayjsDateProvider implements IDateProvider {


    compareDiferenceInHours(start_date: Date, end_date: Date): number {

        return dayjs(end_date).diff(start_date, "hours") //faz a comparaçao
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean { //se adata passada é antes da data final
        return dayjs(start_date).isBefore(end_date)
    }


    addOrSubtractTime(operation: string = ("sub" || "add"), timeUnit: string, amountOfTime: number, date?: string | Date) {
        //adciona ou subtrai tempo de uma data passada ou da data atual
        //timeUnit = "day", "month", "hour" ...
        //amountofTime = 1, 2, 3 ...

        if (!date) { //se nao for passada, cria uma

            let dateNow

            if (operation === "sub") {


                dateNow = dayjs.tz(dayjs().toDate()).subtract(amountOfTime, timeUnit).format("YYYY-MM-DDTHH:mm:ss")

                return dateNow
            }

            dateNow = dayjs.tz(dayjs().toDate()).add(amountOfTime, timeUnit).format("YYYY-MM-DDTHH:mm:ss")

            return dateNow
        }

        if (operation === "sub") {
            date = dayjs(date).subtract(amountOfTime, timeUnit).format("YYYY-MM-DDTHH:mm:ss")


            return date
        }

        date = dayjs(date).add(amountOfTime, timeUnit).format("YYYY-MM-DDTHH:mm:ss")


        return date


    }

    convertToDate(date: string | Date): Date {
        //pega uma data em string e transforma em date
        //se a string nao for valida retorna um erro

        const isValid = dayjs(date, ["YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ssZ[Z]", "YYYY-MM-DDTHH:mm:ss"]).isValid()


        if (!isValid) {

            // throw new AppError("this is not a valid date")
        }

        const d = dayjs(date, ["YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ssZ[Z]"]).format("YYYY-MM-DDTHH:mm:ss")


        return d


    }

    isValidDate(date: string | Date): boolean {

        const isValid = dayjs(date).isValid()

        if (!isValid) {

            return false
        }

        return true
    }

    IsToday(date: Date): boolean {

        if (dayjs(date).isToday()) {

            return true
        }

        return false

    }

    dateNow(): Date {

        return dayjs.tz(dayjs().toDate()).format("YYYY-MM-DDTHH:mm:ssZ[Z]")//ISO FORMAT
    }

    formatDate(date: Date, formatType: string): Date {

        return dayjs(date).format(formatType)
    }


}

export { DayjsDateProvider }