<?php

namespace App\Http\Controllers\Api;

use Hash;
use Validator;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Comment;
use App\Models\Category;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\API\BaseController as BaseController;
   

class AdminController extends BaseController
{
	public function getUsers(){
		try {
			$data = User::orderBy('id', 'desc')->get();
			return $this->sendResponse($data, true);
		} catch (\Exception $e) {
			return $this->sendError($e->getMessage());
		}
	}

	public function getFeedbacks(){
		try {
			$data = Feedback::with('category:id,name')->orderBy('id', 'desc')->get();
			return $this->sendResponse($data, true);
		} catch (\Exception $e) {
			return $this->sendError($e->getMessage());
		}
	}	
	public function getComments(){
		try {
			$data = Comment::with(['feedback:id,title', 'user:id,first_name,last_name'])
							->orderBy('id', 'desc')
							->get();
			return $this->sendResponse($data, true);
		} catch (\Exception $e) {
			return $this->sendError($e->getMessage());
		}
	}	

	public function getCategories(){
		try {
			$data = Category::orderBy('id', 'desc')->get();
			return $this->sendResponse($data, true);
		} catch (\Exception $e) {
			return $this->sendError($e->getMessage());
		}
	}

	public function addComment(Request $request)
	{
		try{
			$validator = Validator::make($request->all(), [
				'comment' => 'required',
				'feedback_id' => 'required',
			]);
			if($validator->fails()){
				return response()->json(['status'=>422,'message' => $validator->errors()]);
			}
			
			$comment = New Comment;
			$comment->content = $request->comment;
			$comment->user_id = Auth::guard('api')->user()->id;
			$comment->feedback_id = $request->feedback_id;
			if($comment->save()){
				return $this->sendResponse($comment, 'Comment has been added.');
			} else {
				return $this->sendResponse('Something goes wrong. Please see logs for more information!',false);
			}
			
		} catch (\Exception $e) {
			return $this->sendError($e->getMessage());
		}
	}	
	public function createFeedback(Request $request){
		try {
			$validator = Validator::make($request->all(), [
				'title' => 'required',
				'description' => 'required',
				'category' => 'required'
			]);
			
			$request->password = bcrypt($request->password);

			if($validator->fails()){
				return response()->json(['status'=>422,'message' => $validator->errors()]);
			}
			$user = New Feedback;
			$user->title = $request->title;
			$user->description = $request->description;
			$user->category_id = $request->category;
			$user->user_id = Auth::guard('api')->user()->id;

			if($user->save()){
				return $this->sendResponse($user,'Feedback has been added');
			} else {
				return $this->sendResponse('Something goes wrong. Please see logs for further details!',false);
			}
		} catch (\Exception $e) {
			return $this->sendError($e->getMessage());
		}
	}
}