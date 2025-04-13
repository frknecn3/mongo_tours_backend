const express = require("express");
const { getAllTours, createTour } = require("./controllers/tourController.js");
const tourRouter = require("./routes/tourRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const e = require("./utils/error.js")

const app = express();
const morgan = require("morgan");
const sendMail = require("./utils/sendMail.js");
const globalErrorHandler = require("./utils/globalErrorHandler.js");

//gelen istekleri loglar
app.use(morgan("dev"));

//gelen isteklerin body'sine eriş
app.use(express.json());

// cookielere eriş
app.use(cookieParser());

//turlar ile alakalı yolları projeye tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);






// bilinmeyen endpointler için verilecek hata mesajı
app.all("*",(req,res,next)=>{
    next(e(404,`Aradığınız ${req.originalUrl} adresi bulunamadı.`))
})

// evrensel hata yakalayıcı ve cevap gönderen fonksiyonumuz.
// en aşağıda belirliyoruz ki bütün hataları yakalayabilsin.
app.use(globalErrorHandler);



module.exports = app;
