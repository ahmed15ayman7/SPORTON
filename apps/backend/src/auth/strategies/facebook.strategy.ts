import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(configService: ConfigService) {
        super({
            clientID: configService.get<string>('FACEBOOK_APP_ID') || '',
            clientSecret: configService.get<string>('FACEBOOK_APP_SECRET') || '',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            scope: ['email'],
            profileFields: ['emails', 'name'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any,
    ): Promise<any> {
        const { name, emails } = profile;
        const user = {
            email: emails[0].value,
            name: name.givenName + ' ' + name.familyName,
            accessToken,
        };
        done(null, user);
    }
} 