<?php

namespace App\Http\Controllers\Api;

use App\Models\Company;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
	public function __construct()
	{
		// No middleware here - we'll use policy middleware in routes
	}

	// Retrieve companies (both Writer and Editor)
	public function index()
	{
		\Log::info('CompanyController@index accessed', [
			'user' => auth()->user(),
			'can_retrieve_companies' => auth()->user()->can('retrieve-companies')
		]);

		$companies = Company::where('status', 'Active')
			->select('id', 'name')
			->orderBy('name')
			->paginate(10);

		return response()->json($companies);
	}

	// View specific company (both Writer and Editor)
	public function show(Company $company)
	{
		return response()->json($company);
	}

	// Create company (Editor only)
	public function store(Request $request)
	{
		$validated = $request->validate([
			'logo' => 'required|url|max:255',
			'name' => 'required|string|max:255',
			'status' => 'required|in:Active,Inactive',
		]);

		$company = Company::create($validated);
		return response()->json($company, 201);
	}

	// Update company (Editor only)
	public function update(Request $request, Company $company)
	{
		$validated = $request->validate([
			'logo' => 'sometimes|url|max:255',
			'name' => 'sometimes|string|max:255',
			'status' => 'sometimes|in:Active,Inactive',
		]);

		$company->update($validated);
		return response()->json($company);
	}

	// Delete company (Editor only)
	public function destroy(Company $company)
	{
		// Check if company has any articles
		if ($company->articles()->exists()) {
			return response()->json([
				'message' => 'Cannot delete company with existing articles'
			], 422);
		}

		$company->delete();
		return response()->json(['message' => 'Company deleted successfully']);
	}
}
