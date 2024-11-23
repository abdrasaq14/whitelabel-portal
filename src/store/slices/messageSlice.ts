import { MessageSlice } from '@/interfaces/SliceInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { MessageService } from '@/services/MessageService';
  
//initial state
const initialState: MessageSlice = {
    loading: false,
    error: null,
    conversationsResult: null,
    activeConversation: null,
    activePartner: null,
    messagesResult: null,
    messageLoading: false,
    sendLoading: false
};

//Actions
export const conversationsFetched = createAsyncThunk('conversationsFetched', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await MessageService.getAllConversations(data.userId);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const conversationsFetchedAgain = createAsyncThunk('conversationsFetchedAgain', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await MessageService.getAllConversations(data.userId);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const messagesFetched = createAsyncThunk('messagesFetched', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await MessageService.getAllMessages(data.conversationId);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const messageSent = createAsyncThunk('messageSent', async (data: any, { rejectWithValue }) => {
    
    try{
        const {conversationId, senderId, text} = data;
        const response: any = await MessageService.sendMessage(conversationId, {senderId, text});
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const setMessageToSeen = createAsyncThunk('setMessageToSeen', async (data: any, { rejectWithValue }) => {
    
    try{
        // console.log("Set message seen", data);
        const response: any = await MessageService.setMessageSeen(data);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

//Slice
const messageSlice = createSlice({
    name: 'message',
    
    initialState,
    
    reducers: {
        activeConversation: (state, action) => {
            state.activeConversation = action.payload
        },

        activePartner: (state, action) => {
            state.activePartner = action.payload;
        },

        realtimeMessageAdded: (state, action) => {
            state.messagesResult?.push(action.payload)
        },
    },

    extraReducers: (builder) => {
        builder

        .addCase(conversationsFetched.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(conversationsFetched.fulfilled, (state, action) => {
            state.loading = false;
            state.conversationsResult = action?.payload?.result;
        })
        .addCase(conversationsFetched.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(conversationsFetchedAgain.fulfilled, (state, action) => {
            state.conversationsResult = action?.payload?.result;
        })

        .addCase(messagesFetched.pending, (state) => {
            state.messageLoading = true;
            state.error = null
        })
        .addCase(messagesFetched.fulfilled, (state, action) => {
            state.messageLoading = false;
            state.messagesResult = action?.payload?.result;
            // console.log("Messages from resuc", action?.payload?.result)
        })
        .addCase(messagesFetched.rejected, (state, action: any) => {
            state.messageLoading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(messageSent.pending, (state) => {
            state.sendLoading = true;
            state.error = null
        })
        .addCase(messageSent.fulfilled, (state, action) => {
            state.sendLoading = false;
        })
        .addCase(messageSent.rejected, (state, action: any) => {
            state.sendLoading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(setMessageToSeen.pending, (state) => {
            state.sendLoading = true;
            state.error = null
        })
        .addCase(setMessageToSeen.fulfilled, (state, action) => {
            state.sendLoading = false;
        })
        .addCase(setMessageToSeen.rejected, (state, action: any) => {
            state.sendLoading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

    }
})

export const {activeConversation, activePartner, realtimeMessageAdded} = messageSlice.actions;

export default messageSlice.reducer;

//selectors
export const getMessageSlice = (state: RootState) => state.message