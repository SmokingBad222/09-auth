import { NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import type { AxiosError } from 'axios';


export async function POST(request: Request) {
  const cookieStore = await cookies();
  try {
	  const formData = await request.formData();


	  const { data } = await api.post('/upload', formData, {
	    headers: {
	      Cookie: cookieStore.toString(),
	    },
	  });


    return NextResponse.json(data);


  } catch (error) {
    const err = error as AxiosError<{ error?: string; message?: string }>;
    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message,
      },
      { status: err.response?.status ?? 500 }
    );
  }
}