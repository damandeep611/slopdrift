export interface Image {
  id: string;
  url: string;
  prompt: string;
  model: string;
  resolution: string;
  quality: string;
  style: string;
  category: string;
}

export const mockImages: Image[] = [
    {
      id: "2454624254",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop",
      prompt:
        "A serene mountain landscape at sunset with vibrant orange and purple hues reflecting on a crystal clear lake",
      model: "DALL-E 3",
      resolution: "1024x1536",
      quality: "HD",
      style: "Natural",
      category: "Landscape"
    },
    {
      id: "2454624255",
      url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=500&fit=crop",
      prompt:
        "Futuristic cyberpunk city with neon lights and flying cars in a rainy night scene",
      model: "Midjourney v6",
      resolution: "1024x1280",
      quality: "HD",
      style: "Cinematic",
      category: "Cityscape"
    },
    {
      id: "2454624256",
      url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=700&fit=crop",
      prompt:
        "Abstract geometric pattern with vibrant colors and flowing shapes creating a sense of movement",
      model: "Stable Diffusion XL",
      resolution: "1024x1792",
      quality: "Standard",
      style: "Abstract",
      category: "Abstract"
    },
    {
      id: "2454624257",
      url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=550&fit=crop",
      prompt:
        "Portrait of a majestic lion with golden mane in soft morning light",
      model: "DALL-E 3",
      resolution: "1024x1408",
      quality: "HD",
      style: "Photorealistic",
      category: "Animal"
    },
    {
      id: "2454624258",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=650&fit=crop",
      prompt:
        "Enchanted forest with magical glowing mushrooms and fireflies at twilight",
      model: "Midjourney v6",
      resolution: "1024x1664",
      quality: "HD",
      style: "Fantasy",
      category: "Fantasy"
    },
    {
      id: "2454624259",
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=500&fit=crop",
      prompt: "Space station orbiting Earth with aurora borealis visible below",
      model: "Stable Diffusion XL",
      resolution: "1024x1280",
      quality: "HD",
      style: "Sci-fi",
      category: "Space"
    },
    {
      id: "2454624250",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      prompt:
        "Tranquil Japanese garden with cherry blossoms and a traditional wooden bridge",
      model: "DALL-E 3",
      resolution: "1024x1536",
      quality: "HD",
      style: "Natural",
      category: "Garden"
    },
    {
      id: "2454624251",
      url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=700&fit=crop",
      prompt:
        "Underwater coral reef teeming with colorful tropical fish and marine life",
      model: "Midjourney v6",
      resolution: "1024x1792",
      quality: "HD",
      style: "Vivid",
      category: "Underwater"
    },
    {
  id: "2454624266",
  url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
  prompt: "Majestic snow-capped mountain range during golden hour with dramatic cloud formations",
  model: "Stable Diffusion XL",
  resolution: "1024x1536",
  quality: "Ultra HD",
  style: "Photorealistic",
  category: "Landscape"
},
{
  id: "2454624267",
  url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=500&fit=crop",
  prompt: "Misty forest with sun rays filtering through dense pine trees in early morning",
  model: "DALL-E 3",
  resolution: "1024x1280",
  quality: "Standard",
  style: "Atmospheric",
  category: "Forest"
},
{
  id: "2454624268",
  url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
  prompt: "Aerial view of rugged coastline with turquoise waters and dramatic rock formations",
  model: "Midjourney v5.2",
  resolution: "1024x1024",
  quality: "HD",
  style: "Aerial",
  category: "Aerial"
},
{
  id: "2454624269",
  url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
  prompt: "Enchanted forest with bioluminescent plants and mystical fog at twilight",
  model: "Stable Diffusion 1.5",
  resolution: "768x1152",
  quality: "Standard",
  style: "Fantasy",
  category: "Fantasy"
},
{
  id: "2454624270",
  url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop",
  prompt: "Modern minimalist architecture with clean lines and dramatic shadow play",
  model: "DALL-E 3",
  resolution: "1024x1280",
  quality: "HD",
  style: "Architectural",
  category: "Architecture"
},
{
  id: "2454624271",
  url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=400&h=600&fit=crop",
  prompt: "Peaceful countryside landscape with rolling hills and grazing sheep at sunset",
  model: "Midjourney v6",
  resolution: "1024x1536",
  quality: "Ultra HD",
  style: "Natural",
  category: "Countryside"
},
{
  id: "2454624272",
  url: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=400&h=400&fit=crop",
  prompt: "Abstract liquid art with vibrant colors and fluid dynamics in motion",
  model: "Stable Diffusion XL",
  resolution: "1024x1024",
  quality: "HD",
  style: "Abstract",
  category: "Abstract"
},
{
  id: "2454624273",
  url: "https://image.lexica.art/full_jpg/f35cb59b-3cfa-4dc0-ab92-d8dacab78e5c",
  prompt: "Urban street photography in Tokyo during rainy night with neon reflections",
  model: "DALL-E 3",
  resolution: "1024x1280",
  quality: "Standard",
  style: "Street Photography",
  category: "Urban"
},
{
  id: "2454624274",
  url: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=600&fit=crop",
  prompt: "Lush tropical waterfall surrounded by exotic vegetation and morning mist",
  model: "Midjourney v5.2",
  resolution: "768x1152",
  quality: "HD",
  style: "Natural",
  category: "Waterfall"
},
{
  id: "2454624275",
  url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=500&fit=crop",
  prompt: "Macro photography of dew drops on spider webs in morning sunlight",
  model: "Stable Diffusion XL",
  resolution: "1024x1280",
  quality: "Ultra HD",
  style: "Macro",
  category: "Macro"
},
{
  id: "2454624276",
  url: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=400&h=400&fit=crop",
  prompt: "Northern lights dancing over frozen lake in Arctic wilderness",
  model: "DALL-E 3",
  resolution: "1024x1024",
  quality: "HD",
  style: "Astrophotography",
  category: "Northern Lights"
},
{
  id: "2454624277",
  url: "https://image.lexica.art/full_jpg/192c7175-67c0-4853-8da3-56baada80de2",
  prompt: "Futuristic space station orbiting a gas giant with intricate details",
  model: "Midjourney v6",
  resolution: "1024x1536",
  quality: "Ultra HD",
  style: "Sci-Fi",
  category: "Space"
},
{
  id: "2454624278",
  url: "https://image.lexica.art/full_jpg/af5394d2-8bee-4ae5-9bee-1b53dfbc03f4",
  prompt: "Dramatic desert landscape with sand dunes and starry night sky",
  model: "Stable Diffusion 1.5",
  resolution: "768x960",
  quality: "Standard",
  style: "Landscape",
  category: "Desert"
},
{
  id: "2454624279",
  url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop",
  prompt: "Fantasy castle floating among clouds with magical energy beams",
  model: "DALL-E 3",
  resolution: "1024x1536",
  quality: "HD",
  style: "Fantasy",
  category: "Fantasy"
},
{
  id: "2454624280",
  url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=400&fit=crop",
  prompt: "Underwater coral reef with colorful tropical fish and clear blue water",
  model: "Midjourney v5.2",
  resolution: "1024x1024",
  quality: "Ultra HD",
  style: "Underwater",
  category: "Underwater"
},
{
  id: "2454624281",
  url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
  prompt: "Ancient temple ruins overgrown with jungle vegetation at sunrise",
  model: "Stable Diffusion XL",
  resolution: "1024x1280",
  quality: "HD",
  style: "Adventure",
  category: "Ruins"
},
{
  id: "2454624282",
  url: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=600&fit=crop",
  prompt: "Steampunk laboratory with brass machinery and intricate clockwork details",
  model: "DALL-E 3",
  resolution: "1024x1536",
  quality: "Standard",
  style: "Steampunk",
  category: "Steampunk"
},
{
  id: "2454624283",
  url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=500&fit=crop",
  prompt: "Cozy cabin interior with warm fireplace and snowy landscape outside",
  model: "Midjourney v6",
  resolution: "1024x1280",
  quality: "HD",
  style: "Cozy",
  category: "Interior"
},
{
  id: "2454624284",
  url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop",
  prompt: "Autumn forest path covered in colorful fallen leaves during overcast day",
  model: "Stable Diffusion XL",
  resolution: "1024x1024",
  quality: "Ultra HD",
  style: "Seasonal",
  category: "Forest"
},
{
  id: "2454624285",
  url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=600&fit=crop",
  prompt: "Surreal landscape with floating islands and impossible waterfalls",
  model: "DALL-E 3",
  resolution: "1024x1536",
  quality: "HD",
  style: "Surreal",
  category: "Surreal"
}
  ];