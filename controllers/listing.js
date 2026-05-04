const Listing=require("../models/listing")

// index controller
module.exports.index=async (req, res) => {
  try {
    let { search } = req.query;

    let query = {};

    if (search && search.trim() !== "") {
      query = {
        $or: [
          { location: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } }
        ]
      };
    }

    const listings = await Listing.find(query);

    res.render("listings/index.ejs", { listings, search });
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
};

// new controller..
module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/new.ejs")
}

// show controller
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await  Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
        }
    })
    .populate("owner");
    if(!listing) {
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings")
    }
    console.log(listing)
    res.render("./listings/show.ejs",{listing})
}

// create controller
module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename}
    await newlisting.save();
    req.flash("success","New listing created")
    res.redirect("/listings"); 
}

// edit controller
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings")
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("./listings/edit.ejs",{listing,originalImageUrl})
}

// 
module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})

    if(typeof req.file!=="undefined") {
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();

    }

    req.flash("success","Listing Updated!")
    res.redirect('/listings')
}

// delete controller
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success","listing Deleted")
    res.redirect("/listings")
}