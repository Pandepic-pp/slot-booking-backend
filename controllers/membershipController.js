const Membership = require('../models/membership');
const { packages } = require('../config/data');

async function addMembership(req, res) {
    try {
        const { phone, membershipId } = req.body;
        const pkg = packages.find(item => item.id === membershipId);

        if (!pkg) {
            return res.status(400).json({ message: "Invalid membershipId" });
        }

        const membership = new Membership({
            package_id: membershipId,
            phone: phone,
            oversLeft: pkg.package
        });

        await membership.save();
        res.status(201).json({ message: "Membership added", membership });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function getMemberships(req, res) {
    try {
        const { phone, membershipId } = req.body;
        let memberships;

        if (phone && membershipId) memberships = await Membership.findOne({ phone: phone, package_id: membershipId });
        else if (phone) memberships = await Membership.find({ phone: phone });
        else if (membershipId) memberships = await Membership.find({ package_id: membershipId });
        else memberships = await Membership.find();

        res.status(200).json(memberships);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateMembership(req, res) {
    try{
        const {phone, overs} = req.body;
        const membership = await Membership.findOne({phone: phone});

        if (!membership) {
            return res.status(404).json({ message: "No membership found" });
        }

        membership.oversLeft = Math.max(membership.oversLeft - overs, 0);
        await membership.save();

        res.status(200).json({ message: `Overs left: ${membership.oversLeft}`, membership });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {updateMembership, getMemberships, addMembership};