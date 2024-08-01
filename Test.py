import json
import logging


logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event,context):
    logging.info("****in function****")
    try:
        logging.info(" event  : " +str[event])
        city_name = event['queryStringParameters']['city']

    except Exception as e:
        logging.info(" event  : " +str[event])
        return{
            'city code ' : 400,
            'body':json.dumps("No city code provided")

        }
    ciryDict ={
            'YGN' : 'Yangon',
            'MGY' : 'Magway',
            'MDY' : 'Mandalay',
            'NPT' : 'Naypyitaw',
            'YNG' : 'Yanangaung'
        }
    try:
            cityname  = cityDict[city_name]
    except Exception as e:
            logging.error("exception :" + str(e))
            return{
            'city code ' : 400,
            'body':json.dumps("No city code provided")

        }
    return{
            'city code ' : 400,
            'headers' : {
                'context-type' : 'application/json'
            },
            'body':json.dumps("No city code provided")

        }