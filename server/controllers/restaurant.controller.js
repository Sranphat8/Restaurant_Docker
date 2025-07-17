import Restaurant from '../models/restaurant.model.js';

// Create an object to be used as the default export
const restaurantcontroller = {
    // Function to create a new restaurant
    create: async (req, res) => {
        const { name, type, imageUrl } = req.body;

        // Validate incoming data
        if (!name || !type || !imageUrl) {
            return res
                .status(400)
                .send({ message: "Name, type or imageUrl cannot be empty!" });
        }

        try {
            // Check if a restaurant with the given name already exists
            const existingRestaurant = await Restaurant.findOne({ where: { name: name } });

            if (existingRestaurant) {
                return res.status(400).send({ message: "Restaurant already exists!" });
            }

            // Create a new restaurant object
            const newRestaurant = {
                name: name,
                type: type,
                imageUrl: imageUrl,
            };

            // Save the new restaurant to the database
            const data = await Restaurant.create(newRestaurant);
            res.send(data); // Send the created restaurant data back

        } catch (error) {
            // Handle any errors during the creation process
            res.status(500).send({
                message: error.message || "Something error while creating the restaurant",
            });
        }
    }
};

// Get all restaurants
restaurantcontroller.getAll = async (req, res) => {
    try {
        // Find all restaurants in the database
        const data = await Restaurant.findAll();
        res.send(data); // Send the list of restaurants

    } catch (error) {
        // Handle any errors during the retrieval process
        res.status(500).send({
            message: error.message || "Something error while getting all restaurants",
        });
    }
};

// Get restaurant by ID
restaurantcontroller.getById = async (req, res) => {
    const id = req.params.id; // Get the ID from request parameters

    try {
        // Find a restaurant by its primary key (ID)
        const data = await Restaurant.findByPk(id);

        if (!data) {
            // If no restaurant is found with the given ID
            res.status(404).send({ message: "Not found restaurant with id=" + id });
        } else {
            // If restaurant is found, send its data
            res.send(data);
        }
    } catch (error) {
        // Handle any errors during the retrieval process
        res.status(500).send({
            message: error.message || "Something error while getting the restaurant with id=" + id,
        });
    }
};

// Update restaurant
restaurantcontroller.update = async (req, res) => {
    const id = req.params.id; // Get the ID from request parameters
    const { name, type, imageUrl } = req.body; // Destructure updated data from request body

    // Validate incoming data
    if (!name || !type || !imageUrl) {
        return res.status(400)
            .send({ message: "Name, type and imageUrl cannot be empty for update!" });
    }

    try {
        // Update the restaurant with the given ID
        const num = await Restaurant.update(
            { name: name, type: type, imageUrl: imageUrl },
            { where: { id: id } },
        );

        // 'num' will be an array where the first element is the number of affected rows
        if (num[0] === 1) {
            res.send({ message: "Restaurant was updated successfully." });
        } else {
            // If no rows were affected, it means the restaurant was not found or data was identical
            res.send({
                message: `Cannot update restaurant with id=${id}. Maybe restaurant was not found or provided data is identical!`,
            });
        }
    } catch (error) {
        // Handle any errors during the update process
        res.status(500).send({
            message: error.message || "Error updating restaurant with id=" + id
        });
    }
};

// Delete restaurant (this function was missing, adding it based on common controller patterns)
restaurantcontroller.delete = async (req, res) => {
    const id = req.params.id; // Get the ID from request parameters

    try {
        // Delete the restaurant with the given ID
        const num = await Restaurant.destroy({
            where: { id: id }
        });

        if (num === 1) {
            res.send({ message: "Restaurant was deleted successfully!" });
        } else {
            res.status(404).send({ message: `Cannot delete restaurant with id=${id}. Maybe restaurant was not found!` });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Could not delete restaurant with id=" + id
        });
    }
};

export default restaurantcontroller;
