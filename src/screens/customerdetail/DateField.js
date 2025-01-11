import React,{useState} from 'react';
import DatePicker from 'react-native-date-picker'

const DateField = ({item,field,label}) => {

	const [open, setOpen] = useState(false);
	return (

		<DropDownPicker
          zIndex={1002}
                   zIndexInverse={1002}
                   dropDownDirection={"BOTTOM"}
                   searchable={true}
          	   open={open}
          	   setOpen={setOpen}
		       value={field.value}
		       setValue={(callback: any) => field.onChange(callback())}
		       items={item}
		       placeholder={`Choose ${label}.`}
		       listMode="SCROLLVIEW"

                    scrollViewProps={{
                              nestedScrollEnabled: true,
                              showsVerticalScrollIndicator: false,
                      }}
                    searchContainerStyle={{
                      borderColor: "#008B8B",
                      color: "#008B8B"
                    }}
                    searchTextInputStyle={{
                      borderColor: "#008B8B",
                      color: "#008B8B"
                    }}
                    listItemLabelStyle={{
                      color: "#008B8B"
                    }}
                    textStyle={{
                      fontSize: 15,
                      color: "#008B8B"
                    }}
                    listMessageTextStyle={{
                      color: "#008B8B"
                    }}

                    searchPlaceholderTextColor="#008B8B"
                    searchTextInputStyle={{
                      color: "#008B8B",borderColor:'#008B8B'
                    }}
                    dropDownContainerStyle={{
                      borderColor: '#008B8B',
                      color: "#008B8B",
                      position: 'relative',
                      top: 0
                    }}


                    placeholderStyle={{
                    color: "#008B8B",
                    
                  }}
		       style={{fontSize: 14,fontWeight: '400',fontFamily:'Poppins-Regular',backgroundColor: '#fff',borderWidth: 1,borderColor: '#008B8B',height: 'auto',color: '#008B8B',minHeight: 44}}
          />

		)
}

export default DateField;