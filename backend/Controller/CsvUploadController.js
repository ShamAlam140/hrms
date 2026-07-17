const StockSchema= require('../Schemas/stock')
const HolidaySchema = require('../Schemas/holidaySchema')
const csv= require('csvtojson')


exports.uploadStockCsv=async(req, res)=>{
    try {
        const filedsData=[]
        csv()
        .fromFile(req.file.path)
        .then(async(response)=>{
            
            for(var i=0;i<response.length; i++){
                filedsData.push({
                    productName: response[i].Name,
                    productId:response[i].ProductId,
                    category:response[i].Category,
                    quantityPurchased:response[i].Quantity,
                    unitPrice:response[i].UnitPrice,
                    totalAmount:response[i].TotalAmount,
                    supplier:response[i].Supplier,
                    status:response[i].Status,
                })
            }

          await   StockSchema.insertMany(filedsData)
        })
        res.status(200).send("CSV Imported.")
    } catch (error) {
        
        res.status(500).send("internal server error")
    }
}



exports.uploadHolidayCsv=async(req, res)=>{
    try {
        const filedsData=[]
        csv()
        .fromFile(req.file.path)
        .then(async(response)=>{
            
            for(var i=0;i<response.length; i++){
                filedsData.push({
                    day: response[i].Day,
                    month:response[i].Month,
                    year:response[i].Year,
                    holidayName:response[i].HolidayName
                })
            }

          await   HolidaySchema.insertMany(filedsData)
        })
        res.status(200).send("CSV Imported.")
    } catch (error) {
        
        res.status(500).send("internal server error")
    }
} 