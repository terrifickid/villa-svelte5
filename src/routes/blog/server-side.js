app.get("/blog/", async (req, res) => {
  const now = Date.now();
  
  // Check if cache is valid
  if (blogCache.data && (now - blogCache.timestamp) < blogCache.ttl) {
    console.log("Returning cached blog list");
    return res.json(blogCache.data);
  }
  try {
    console.log("Fetching fresh blog list");
    const client = await getDeliveryClient();
    
    // Fetch all entries and assets in one request using includes
    const blogs = await client.getEntries({ 
      content_type: BlogContentTypeId,
      include: 3 // Include linked assets
    });
    
    // Process items using the included assets (no additional API calls needed)
    const resolvedBlogsIds = [];
    for (let i = 0; i < blogs.items.length; i++) {
      const item = blogs.items[i];
      
      try {
        const img_id = item.fields.imagePreview.sys.id;
        // Find the asset in the includes
        const asset = blogs.includes?.Asset?.find(a => a.sys.id === img_id);
        resolvedBlogsIds.push({
          id: item.sys.id,
          title: item.fields.title,
          slug: item.fields.slug,
          excerpt: item.fields.excerpt || item.fields.description || "",
          publishedDate: item.sys.publishedAt,
          imagePreview: asset ? "https:" + asset.fields.file.url : "",
          tags: item.fields.tags || [],
        });
      } catch (error) {
        console.error("Error processing blog item:", error);
        // Still add the blog post but without image
        resolvedBlogsIds.push({
          id: item.sys.id,
          title: item.fields.title,
          slug: item.fields.slug,
          excerpt: item.fields.excerpt || item.fields.description || "",
          publishedDate: item.sys.publishedAt,
          imagePreview: "",
          tags: item.fields.tags || [],
        });
      }
    }
    
    // Update cache
    blogCache.data = resolvedBlogsIds;
    blogCache.timestamp = now;
    
    res.json(resolvedBlogsIds);
  } catch (error) {
    console.error("Error fetching blog list:", error);
    res.status(200).json([]); // Return empty array on error
  }
});

app.get("/blog/:slug", async (req, res) => {
  const slug = req.params.slug;
  const now = Date.now();
  
  // Check if blog post is cached
  const cached = blogPostCache.get(slug);
  if (cached && (now - cached.timestamp) < blogCache.ttl) {
    console.log(`Returning cached blog post: ${slug}`);
    return res.json(cached.data);
  }
  
  console.log(`Fetching fresh blog post: ${slug}`);
  const client = await getDeliveryClient();
  try {
    const blog = await client.getEntries({
      content_type: BlogContentTypeId,
      "fields.slug": slug,
      include: 2 // Include linked assets
    }).then((response) => {
      if (response.items.length > 0) {
        return response.items[0];
      } else {
        throw new Error("Blog post not found");
      }
    });
    
    // Update cache
    blogPostCache.set(slug, {
      data: blog,
      timestamp: now,
    });
    
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: "Blog post not found" });
  }
});