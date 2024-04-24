
export interface NewUserDtoUserEnvelope { 
    user?: NewUserDto;
}
export interface NewUserDto { 
    username?: string;
    email?: string;
    password?: string;
}

export interface UserDtoUserEnvelope { 
    user?: UserDto;
}

export interface UserDto { 
    username?: string;
    email?: string;
    token?: string;
    bio?: string;
    image?: string;
}


export interface LoginUserDtoUserEnvelope { 
    user?: LoginUserDto;
}

export interface LoginUserDto { 
    email?: string;
    password?: string;
}