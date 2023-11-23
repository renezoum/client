import { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [file_image, setFile_image] = useState(null);
  const [file_video, setFile_video] = useState(null);
  const [preview_image, setPreview_image] = useState(null);
  const [preview_video, setPreview_video] = useState(null);
  const [uploadProgresse, setUploadProgresse] = useState(0);

  const handleFileChange_image = (e) =>{
    const selectedFile = e.target.files[0];

    if(selectedFile){
      setFile_image(selectedFile);

      // Affichage de lapercus de l'image
      const reader = new FileReader();
      reader.onloadend = () =>{
        setPreview_image(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleFileChange_video = (e) =>{
    const selectedFile = e.target.files[0];

    if(selectedFile){
      setFile_video(selectedFile);

      // Affichage de lapercus de l'image
      const reader = new FileReader();
      reader.onloadend = () =>{
        setPreview_video(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload_images = async () => {

    if(!file_image){
      console.error('aucun fichier selectionner');
      return;
    }

    const formData = new FormData();
    formData.append('file', file_image);
    try{
      const response = await axios.post('http://localhost:3001/upload_images', formData, {
        onUploadProgress: (ProgressEvent) =>{
          const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
          setUploadProgresse(progress);
        },
      });
      console.log('reponse du serveur :', response.data);
    }catch(error){
      console.error('erreur lors de l\'upload du fichier : ', error);
    };
  
  }
  
  const handleUpload_videos = async () => {

    if(!file_video){
      console.error('aucun fichier selectionner');
      return;
    }

    const formData = new FormData();
    formData.append('file', file_video);
    try{
      const response = await axios.post('http://localhost:3001/upload_videos', formData, {
        onUploadProgress: (ProgressEvent) =>{
          const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
          setUploadProgresse(progress);
        },
      });
      console.log('reponse du serveur_video :', response.data);
    }catch(error){
      console.error('erreur lors de l\'upload du fichier : ', error);
    };
  
  }
  
 

  return (
    <>
        <div className='row'>
          <div className='col' style={{border:'solid black', width:"700", height:"500"}}  >
              <h3>Importer une photo</h3>
              <input className='control-form' onChange={handleFileChange_image} type="file" />

              <div className='card' style={{marginTop:"50px"}}>
                {preview_image && (
                   <img src={preview_image} alt="impossible"  width={'100%'} /> 
                )}
                {uploadProgresse > 0 && uploadProgresse <100 && (
                  <div>
                      <p>Chargment en cours... {uploadProgresse}%</p>
                      <progress value={uploadProgresse} max='100'></progress>
                  </div>
                )}
                <button onClick={handleUpload_images}>soumettre</button>
              </div>
            </div>



            <div className='col'  style={{border:'solid black', width:"700", height:"500"}}>
              <h3>Importer une video</h3>
              <input className='control-form' onChange={handleFileChange_video} type="file" />
              <div className='card' style={{marginTop:"120px"}}>
                  {preview_video &&(
                      <video width="100%" height="400px" controls autoPlay>
                          <source src={preview_video} type="video/mp4"/>  
                          Votre navigateur ne prend pas en charge la balise vidéo.
                      </video>
                    )}
                     <button onClick={handleUpload_videos}>soumettre</button>
              </div>
            </div>
        </div>
    </>
  )
}

export default App
