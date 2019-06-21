import React, {Component} from 'react';
import api from '../service/api'; 

import { View, Text, FlatList, TouchableOpacity, StyleSheet , } from 'react-native';

export default class Main extends Component{
	static navigationOptions = {
		title : " HOME   ",
		
	};

	state = {
		productInfo: {},
		docs: [],
		page: 1
	};

	componentDidMount(){
		this.loadProducts();
	}

	loadProducts = async( page ) => {
		const response = await api.get(`/products?page=${page}`);
		
		const { docs, ...productInfo } = response.data;

		this.setState({ docs: [...this.state.docs, ...docs], productInfo });
	};

	loadMore = () => {
		const { page, productInfo } = this.state;

		if(page == productInfo.page.length) return;

		const pageNumber = page + 1;

		this.loadProducts(pageNumber);
	};

	renderItem = ({item}) => (
		<View style={styles.productContainer}>
			<Text style={styles.productTitle}>{item.title}</Text>			
			<Text style={styles.productDescription}>{item.description}</Text>
			<TouchableOpacity 
				style={styles.productButton} 
				onPress={()=>{this.props.navigation.navigate("Product", {product: item});
				}}
			>
				<Text style={styles.productButtonText}>PÁGINA NO GIT</Text>
			</TouchableOpacity>
		</View>
	);
	
	render(){
		return(
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					data={this.state.docs}
					keyExtractor={item => item._id}
					renderItem={this.renderItem}
					onEndReached={this.loadMore}
					onEndReachedThreshold={0.1}
				/>
				
			</View>
			);
	}
}

const styles = StyleSheet.create({

	container:{
		flex:1,
		backgroundColor: "#696969"
		
	},
	list:{
		padding: 20
	},
	productContainer: {
		backgroundColor: "#FFF",
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 5,
		padding: 20,
		marginBottom: 20,
	},
	productTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
		justifyContent:'center',
		alignItems:'center'
	},
	productDescription:{ 
		fontSize: 16,
		color: "#333",
		marginTop: 5,
		lineHeight: 24
	},
	productButton: {
		height: 42,
		borderWidth: 4,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		borderColor: "#000",
		backgroundColor: "#000",
		borderRadius: 5,
		
	},
	productButtonText: {
		fontSize: 15,
		color: "#FAFAFA",
		backgroundColor: "#000",
		fontWeight:"bold"
	},
	
});