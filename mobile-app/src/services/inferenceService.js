const runAnemiaModel = async (photoPath) => {
  console.log(`[InferenceService] Simulating Anemia model for path: ${photoPath}`);
  await new Promise(resolve => setTimeout(resolve, 2500));
  const mockOutput = Math.random(); 
  if (mockOutput > 0.6) {
    return { level: 'High', value: 'Hb: ~9.1 g/dL' };
  } else if (mockOutput > 0.3) {
    return { level: 'Medium', value: 'Hb: ~10.8 g/dL' };
  } else {
    return { level: 'Low', value: 'Hb: ~12.5 g/dL' };
  }
};

const runJaundiceModel = async (photoPath) => {
  console.log(`[InferenceService] Simulating Jaundice model for path: ${photoPath}`);
  await new Promise(resolve => setTimeout(resolve, 2500));
    const mockOutput = Math.random();
  if (mockOutput > 0.7) {
    return { level: 'High', value: 'Bilirubin: ~15 mg/dL' };
  } else if (mockOutput > 0.4) {
    return { level: 'Medium', value: 'Bilirubin: ~8 mg/dL' };
  } else {
    return { level: 'Low', value: 'Bilirubin: ~3 mg/dL' };
  }
};

const runVitalsModel = async (photoPath) => {
    console.log(`[InferenceService] Simulating Vitals model for path: ${photoPath}`);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const heartRate = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
    return { level: 'Low', value: `HR: ~${heartRate} bpm` };
};

const runInference = async (testType, photoPath) => {
  switch (testType) {
    case 'anemia':
      return await runAnemiaModel(photoPath);
    case 'jaundice':
      return await runJaundiceModel(photoPath);
    case 'vitals':
      return await runVitalsModel(photoPath);
    default:
      console.warn(`[InferenceService] No model found for test type: ${testType}`);
      return { level: 'Unknown', value: 'N/A' };
  }
};

const inferenceService = {
  runInference,
};

export default inferenceService;
