import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const LABELS = ["Slight", "Severe"];

export default function DamageClassifier() {
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const loadModel = async () => {
    const loadedModel = await tf.loadLayersModel("/model/model.json");
    setModel(loadedModel);
    console.log("Model loaded ✅");
  };
  loadModel();
}, []);


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !model) return;

    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL);
    setResult(null);
    setLoading(true);

    const img = new Image();
    img.src = imageURL;
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224]) // Based on Teachable Machine default input
        .toFloat()
        .div(tf.scalar(255))
        .expandDims();

      const prediction = await model.predict(tensor).data();
      const maxIdx = prediction.indexOf(Math.max(...prediction));

      setResult({
        label: LABELS[maxIdx],
        confidence: (prediction[maxIdx] * 100).toFixed(2),
        discount: LABELS[maxIdx] === "Slight" ? "15%" : "50%",
      });

      setLoading(false);
    };
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Damage Classifier</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm" />

      {imageURL && <img src={imageURL} alt="Uploaded" className="mt-4 rounded-lg shadow-md" />}

      {loading && <p className="text-blue-500 font-semibold">Analyzing image...</p>}

      {result && (
        <div className="mt-4 text-lg font-medium space-y-1">
          <p><strong>Damage:</strong> {result.label}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p><strong>Suggested Discount:</strong> {result.discount}</p>
        </div>
      )}
    </div>
  );
}
