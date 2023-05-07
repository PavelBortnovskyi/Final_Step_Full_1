
package app.security;

import app.exceptions.AuthErrorException;
import app.exceptions.JwtAuthenticationException;
import app.model.UserModel;
import app.repository.RepositoryInterface;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Example;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Log4j2
@Configuration
@RequiredArgsConstructor
public class UserDetailsServiceImplementation implements UserDetailsService {

  private final RepositoryInterface<UserModel> userModelRepository;

  public UserDetails mapper(UserModel userModel) {
    return User
      .withUsername(userModel.getEmail())
      .password(userModel.getPassword())
      .build();
  }

  /**
   * Method returns User Details object for Spring Security authentication procedure using user email as login parameter
   * @throws UsernameNotFoundException
   */
  @Override
  public UserDetails loadUserByUsername(String userMail) throws UsernameNotFoundException {
    UserModel sample = new UserModel();
    sample.setEmail(userMail);
    Example<UserModel> example = Example.of(sample);
    log.info(userMail);
    return this.userModelRepository.findBy(example, FluentQuery.FetchableFluentQuery::first)
      .map(this::mapper)
      .orElseThrow(() -> new AuthErrorException(String.format("User with email: `%s` not found", userMail), HttpStatus.UNAUTHORIZED
      ));
  }
}
