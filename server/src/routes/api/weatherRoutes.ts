import { Router, type Request, type Response } from 'express';
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ message: 'City name is required' });
  }

  try {
    //Fetch/GET weather data from the city name
    const weatherData = await weatherService.getWeatherForCity(cityName);

    // TODO: save city to search history
    await historyService.addCity(cityName);
    console.log('About to Return')
    return res.status(200).json(weatherData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await historyService.getCities();
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve search history' });
  }
});


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCity = await historyService.removeCity(id);
    res.status(200).json(deletedCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete city from search history' });
  }
});

export default router;
