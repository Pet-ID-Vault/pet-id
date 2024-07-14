import './Profile.css';

export default function Profile() {
  return (
    <div class="profile">
      <div class="photo">
        <img src={localStorage.getItem('dogUrl')} />
      </div>
      <div class="super-blur">
        <ul>
          <li>Redacted information: You have not been granted access to this part</li>
          <li>Redacted information: You have not been granted access to this part</li>
          <li>Redacted information: You have not been granted access to this part</li>
        </ul>
      </div>
    </div>
  )
}