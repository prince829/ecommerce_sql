import ejs from 'ejs';
import path from 'path';

// Custom EJS rendering function
const customEjsRenderer = async (filePath:string, options:any, callback:any) => {
  try {
    // Define the path to the layout file
    const layoutPath = path.join(process.cwd(), 'views', 'layouts/mainLayout.ejs');
   
    // Render the body content
    const bodyContent = await ejs.renderFile(filePath, options);

    // Render the layout with the body content
    const layoutContent = await ejs.renderFile(layoutPath, { ...options, body: bodyContent });
    
    // Send the rendered content to the callback
    callback(null, layoutContent);
  } catch (err) {
    callback(err);
  }
};

export default customEjsRenderer;