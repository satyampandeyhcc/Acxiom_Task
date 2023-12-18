

router.use(express.json());
router.use(cors());

router.get("/ok", (req,res)=>{
    res.send("OK")
})
export default router;