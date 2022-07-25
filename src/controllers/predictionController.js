

const predictionController = {
    prediction: (req,res)=>{
        res.render('./predictions/prediction', {name: 'prediction', title: 'PREDICCIONES'});
    }
}

module.exports = predictionController;